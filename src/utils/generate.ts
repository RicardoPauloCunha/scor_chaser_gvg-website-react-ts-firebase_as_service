import crs from 'crypto-random-string';

export function generateKey() {
    return crs({ length: 10 });
}