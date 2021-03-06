import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AdminUpdateUserInput, WebCoreDataAccessService, User } from '@stack-v4200/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { pluck, switchMap, tap, withLatestFrom } from 'rxjs/operators'

export interface UserEditState {
  errors?: any
  loading?: boolean
  user?: User
}

@Injectable()
export class AdminUserEditStore extends ComponentStore<UserEditState> {
  constructor(private readonly data: WebCoreDataAccessService, route: ActivatedRoute) {
    super({ loading: false })
    this.loadUserEffect(route.params.pipe(pluck('userId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly user$ = this.select((s) => s.user)
  readonly vm$ = this.select(this.errors$, this.loading$, this.user$, (errors, loading, user) => ({
    errors,
    loading,
    user: { ...user },
  }))

  readonly loadUserEffect = this.effect<string>((userId$) =>
    userId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((userId) =>
        this.data.adminUser({ userId }).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                user: res.data.adminUser,
                errors: res.errors,
                loading: false,
              }),
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly updateUserEffect = this.effect<AdminUpdateUserInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.user$),
      switchMap(([input, user]) =>
        this.data.adminUpdateUser({ input, userId: user.id }).pipe(
          tapResponse(
            (res) => {
              this.patchState({
                user: res.data.adminUpdateUser,
                errors: res.errors,
                loading: false,
              })
            },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )
}
