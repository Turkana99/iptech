import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _language: any;
  constructor(private http: HttpClient) {
    const lang = localStorage.getItem('language');
    this._language = !!lang
      ? JSON.parse(lang)
      : { displayName: 'Az', culture: 'az-AZ' };
  }

  getAll() {
    return this.http.get(environment?.Languages.getAll);
  }

  setLanguage(language: any) {
    localStorage.setItem('language', JSON.stringify(language));
  }

  getLanguage() {
    return this._language;
  }

  getTranslate() {
    const currentLang = this.getLanguage();

    return (
      this.constantNavItem[currentLang?.culture] ||
      this.constantNavItem['az-AZ']
    );
  }

  constantNavItem: any = {
    'az-AZ': {
      home: 'Ana Səhifə',
      service: 'Xidmətlər',
      product: 'Məhsullar',
      company: 'Şirkət',
      about: 'Haqqımızda',
      contact: 'Əlaqə',
      news: 'Xəbərlər',
      blog: 'Bloqlar',
      phone: 'Telefon',
      email: 'Elektron-poçt ünvanı',
      address: 'Ünvan',
      copyright: 'QafqazNet. Bütün hüquqlar qorunur.',
      reqMessage1: '*Zəruri xana',
      reqMessage2: '*Keçərli e-poçt daxil edin.',
      contactUs: 'Əlaqə',
      contactUsData: {
        apply: 'Müraciət edin',
        contactUs: 'Əlaqə',
        nameAndSurname: 'Ad, soyad',
        email: 'E-poçt',
        contactNumber: 'Əlaqə nömrəsi',
        company: 'Şirkət',
        interestedService: 'Maraqlandığınız xidmət',
        interestedProduct: 'Maraqlandığınız məhsul',
        message: 'Mesaj',
        send: 'Göndər',
        requestSent: 'Müraciətiniz göndərildi!',
        willContactSoon: 'Qısa zamanda sizinlə əlaqə saxlayacağıq.',
      },
      share: 'Paylaşın',
    },
    'en-US': {
      home: 'Home',
      service: 'Services',
      product: 'Products',
      company: 'Company',
      about: 'About Us',
      contact: 'Contact',
      news: 'News',
      blog: 'Blogs',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      copyright: 'QafqazNet. All rights reserved.',
      reqMessage1: '*Required field',
      reqMessage2: '*Please enter a valid email.',
      contactUs: 'Contact us',
      contactUsData: {
        apply: 'Submit a request',
        contactUs: 'Contact us',
        nameAndSurname: 'First name, last name',
        email: 'E-mail',
        contactNumber: 'Contact number',
        company: 'Company',
        interestedService: 'Service of interest',
        interestedProduct: 'Product of interest',
        message: 'Message',
        send: 'Send',
        requestSent: 'Your application has been sent!',
        willContactSoon: 'We will contact you shortly.',
      },
      share: 'Share',
    },
    'ru-RU': {
      home: 'Главная страница',
      service: 'Услуги',
      product: 'Продукты',
      company: 'Компания',
      about: 'О нас',
      contact: 'Контакты',
      news: 'Новости',
      blog: 'Блоги',
      phone: 'Телефон',
      email: 'Электронная почта',
      address: 'Адрес',
      copyright: 'QafqazNet. Все права защищены.',
      reqMessage1: 'Обязательное поле',
      reqMessage2: '*Введите действительный адрес электронной почты.',
      contactUs: 'Свяжитесь с нами',
      contactUsData: {
        apply: 'Оставить заявку',
        contactUs: 'Свяжитесь с нами',
        nameAndSurname: 'Имя, фамилия',
        email: 'Электронная почта',
        contactNumber: 'Контактный номер',
        company: 'Компания',
        interestedService: 'Интересующая услуга',
        interestedProduct: 'Интересующий продукт',
        message: 'Сообщение',
        send: 'Отправить',
        requestSent: 'Ваша заявка отправлена!',
        willContactSoon: 'Мы свяжемся с вами в ближайшее время.',
      },
      share: 'Делиться',
    },
  };
}
