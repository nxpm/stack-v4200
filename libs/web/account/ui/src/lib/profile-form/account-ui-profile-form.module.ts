import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@stack-v4200/web/ui/button'
import { WebUiFormModule } from '@stack-v4200/web/ui/form'
import { AccountUiProfileFormComponent } from './account-ui-profile-form.component'

@NgModule({
  exports: [AccountUiProfileFormComponent],
  declarations: [AccountUiProfileFormComponent],
  imports: [CommonModule, RouterModule, WebUiFormModule, WebUiButtonModule],
})
export class AccountUiProfileFormModule {}