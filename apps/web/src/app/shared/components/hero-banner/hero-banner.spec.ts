import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { HeroBanner } from './hero-banner';

describe('HeroBanner', () => {
  let fixture: ComponentFixture<HeroBanner>;
  let el: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({}).overrideComponent(HeroBanner, {
      set: { schemas: [NO_ERRORS_SCHEMA] },
    });
    fixture = TestBed.createComponent(HeroBanner);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should render the edition variant', () => {
    expect(el.textContent).toContain('Demo');
  });

  it('should have a heading in the sr-only section', () => {
    expect(el.textContent).toContain('SliceBased');
  });
});
