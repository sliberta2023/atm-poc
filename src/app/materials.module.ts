import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { DialogModule } from "@angular/cdk/dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
    exports: [
        MatCardModule,
        DialogModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatTableModule,
        MatToolbarModule
    ]
})
export class MaterialSharedModule {}
