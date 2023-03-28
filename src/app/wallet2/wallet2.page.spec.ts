import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Wallet2Page } from './wallet2.page';

describe('Wallet2Page', () => {
  let component: Wallet2Page;
  let fixture: ComponentFixture<Wallet2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wallet2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Wallet2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
