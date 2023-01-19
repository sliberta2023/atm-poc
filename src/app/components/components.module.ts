import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OverviewComponent } from "./overview/overview.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { MaterialSharedModule } from "../materials.module";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const components = [
    FooterComponent,
    HeaderComponent,
    MessageDialogComponent,
    OverviewComponent,
    PageNotFoundComponent
];

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialSharedModule
    ],
    exports: [
        ...components
    ]
})
export class ComponentsModule {}
