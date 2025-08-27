import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Languages } from '../languages';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _language: any;
  constructor(private http: HttpClient) {
    const lang = localStorage.getItem('language');
    this._language = !!lang
      ? JSON.parse(lang)
      : { name: 'Az', code: Languages.AZ };
  }

  getAll() {
    return this.http.get(environment.Languages.getAll);
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
      this.constantNavItem[currentLang?.code] ||
      this.constantNavItem[Languages.AZ]
    );
  }

  constantNavItem: any = {
    [Languages.AZ]: {
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
      copyright: '©IPTech. Bütün hüquqlar qorunur.',
      reqMessage1: '*Zəruri xana',
      reqMessage2: '*Keçərli e-poçt daxil edin.',
      contactUs: 'Əlaqə',
      requestSent: 'Sorğunuz göndərildi!',
      seeAll: 'Hamısına bax',
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
        subject: 'Mövzu',
      },
      share: 'Paylaşın',
    },
    [Languages.EN]: {
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
      copyright: '©IPTech. All rights reserved.',
      reqMessage1: '*Required field',
      reqMessage2: '*Please enter a valid email.',
      contactUs: 'Contact us',
      requestSent: '{{"requestSent"|translate}}',
      seeAll: 'See all',
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
        subject: 'Subject',
      },
      share: 'Share',
    },
    [Languages.RU]: {
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
      copyright: '©IPTech. Все права защищены.',
      reqMessage1: 'Обязательное поле',
      reqMessage2: '*Введите действительный адрес электронной почты.',
      contactUs: 'Свяжитесь с нами',
      requestSent: 'Запрос отправлен!',
      seeAll: 'Смотреть все',
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
        subject: 'Тема',
      },
      share: 'Делиться',
    },
  };
}
