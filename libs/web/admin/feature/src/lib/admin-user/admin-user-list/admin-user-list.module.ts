import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AdminUserTableModule } from '@stack-v4200/web/admin/ui'
import { WebUiPageHeaderModule } from '@stack-v4200/web/ui/page-header'

import { AdminUserListComponent } from './admin-user-list.component'

@NgModule({
  declarations: [AdminUserListComponent],
  imports: [
    AdminUserTableModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: AdminUserListComponent }]),
    WebUiPageHeaderModule,
  ],
})
export class AdminUserListModule {}
