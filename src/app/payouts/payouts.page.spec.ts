import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayoutsPage } from './payouts.page';

describe('PayoutsPage', () => {
  let component: PayoutsPage;
  let fixture: ComponentFixture<PayoutsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayoutsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
