import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DeathNoticeComponent } from './death-notice/death-notice.component';
import { NoticeEntryComponent } from './notice-entry/notice-entry.component';
import { EditNoticeComponent } from './edit-notice/edit-notice.component';
import { EnterMemoriamComponent } from './memoriam/enter-memoriam/enter-memoriam.component';
import { MemoriamViewComponent } from './memoriam/memoriam-view/memoriam-view.component';
import { MemoriamEditComponent } from './memoriam/memoriam-edit/memoriam-edit.component';
import { DeathNoticeGalleryComponent } from './death-notice-gallery/death-notice-gallery.component';
import { MemoriamComponent } from './memoriam/memoriam.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'home'
    },
    { path: 'dearly-departed', component: DeathNoticeGalleryComponent },
    { path: 'in-memory', component: MemoriamComponent },
    { path: 'death-notice/:noticeId', component: DeathNoticeComponent },
    { path: 'notice-entry', component: NoticeEntryComponent },
    { path: 'edit-notice/:noticeNo', component: EditNoticeComponent },
    { path: 'enter-memoriam', component: EnterMemoriamComponent },
    { path: 'edit-memoriam', component: MemoriamEditComponent },
    { path: 'memoriam-view/:memoriamId', component: MemoriamViewComponent },


];

