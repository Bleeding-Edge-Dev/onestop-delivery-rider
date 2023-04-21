import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PocketPage } from './pocket.page';

describe('PocketPage', () => {
  let component: PocketPage;
  let fixture: ComponentFixture<PocketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PocketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
