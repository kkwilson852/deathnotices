import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ContactUsModel {
    _id!: string;
    name: string = '';
    email: string = '';
    message: string = '';
}