import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyWalletPage } from './my-wallet.page';

describe('MyWalletPage', () => {
  let component: MyWalletPage;
  let fixture: ComponentFixture<MyWalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWalletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
