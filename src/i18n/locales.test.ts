import en from './locales/en-US/translation.json';
import pt from './locales/pt-BR/translation.json';

type Translation = Record<string, unknown>;

function flatten(obj: Translation, prefix = ''): Record<string, unknown> {
  return Object.entries(obj).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === 'object') {
        return { ...acc, ...flatten(value as Translation, fullKey) };
      }
      return { ...acc, [fullKey]: value };
    },
    {},
  );
}

describe('i18n locales', () => {
  it('keeps en-US and pt-BR translation keys in sync', () => {
    const enKeys = Object.keys(flatten(en as Translation));
    const ptKeys = Object.keys(flatten(pt as Translation));

    expect(enKeys).toEqual(ptKeys);
  });
});
