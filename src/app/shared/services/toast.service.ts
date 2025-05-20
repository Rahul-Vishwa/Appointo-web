import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
    toasts: { message: string, class: 'info' | 'error' }[] = [];

    error(message: string){
        this.toasts.push({ message, class: 'error' });
        setTimeout(()=>this.remove(this.toasts.length - 1), 3000);
    }

    info(message: string) {
        this.toasts.push({ message, class: 'info' });
        setTimeout(()=>this.remove(this.toasts.length - 1), 3000);
    }

    remove(index: number) {
        this.toasts.splice(index, 1);
    }
}