import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AdminUserFormModule } from '@stack-v4200/web/admin/ui'
import { WebUiPageHeaderModule } from '@stack-v4200/web/ui/page-header'

import { AdminUserCreateComponent } from './admin-user-create.component'

@NgModule({
  declarations: [AdminUserCreateComponent],
  imports: [
    AdminUserFormModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: AdminUserCreateComponent }]),
    WebUiPageHeaderModule,
  ],
})
export class AdminUserCreateModule {}
