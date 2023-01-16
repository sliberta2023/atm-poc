import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewComponent } from "./overview/overview.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RestockComponent } from "./restock/restock.component";
import { WithdrawComponent } from "./withdraw/withdraw.component";
import { MaterialSharedModule } from "../materials.module";

const components = [
    PageNotFoundComponent,
    OverviewComponent,
    RestockComponent,
    WithdrawComponent
];

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        CommonModule,
        MaterialSharedModule
    ],
    exports: [
        ...components
    ]
})
export class ComponentsModule {}
