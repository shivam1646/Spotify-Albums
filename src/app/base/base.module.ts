import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from 'src/app/base/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
  ],
  declarations: [
  ],
  exports: [
    HeaderModule,
  ]
})
export class BaseModule {

}

