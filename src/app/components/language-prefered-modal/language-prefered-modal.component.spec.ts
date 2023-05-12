import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LanguagePreferedModalComponent } from './language-prefered-modal.component';

describe('LanguagePreferedModalComponent', () => {
  let component: LanguagePreferedModalComponent;
  let fixture: ComponentFixture<LanguagePreferedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagePreferedModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagePreferedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
