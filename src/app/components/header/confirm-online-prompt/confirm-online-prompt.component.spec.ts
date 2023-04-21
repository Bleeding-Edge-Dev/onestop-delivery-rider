import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmOnlinePromptComponent } from './confirm-online-prompt.component';

describe('ConfirmOnlinePromptComponent', () => {
  let component: ConfirmOnlinePromptComponent;
  let fixture: ComponentFixture<ConfirmOnlinePromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmOnlinePromptComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmOnlinePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
