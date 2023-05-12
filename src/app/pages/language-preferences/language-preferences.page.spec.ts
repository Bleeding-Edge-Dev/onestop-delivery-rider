import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LanguagePreferencesPage } from './language-preferences.page';

describe('LanguagePreferencesPage', () => {
  let component: LanguagePreferencesPage;
  let fixture: ComponentFixture<LanguagePreferencesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagePreferencesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagePreferencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
