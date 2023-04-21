import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyTargetComponent } from './my-target.component';

describe('MyTargetComponent', () => {
  let component: MyTargetComponent;
  let fixture: ComponentFixture<MyTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTargetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
