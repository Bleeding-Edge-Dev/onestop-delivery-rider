import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyRewardsPointsPage } from './my-rewards-points.page';

describe('MyRewardsPointsPage', () => {
  let component: MyRewardsPointsPage;
  let fixture: ComponentFixture<MyRewardsPointsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRewardsPointsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyRewardsPointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
