import Cryptojs from 'crypto-js';

export function getEmail(address: string): string {
    return `${address}@fundflow.io`.toLocaleLowerCase();
}

export function getPassword(address: string): string {
    return Cryptojs.SHA3(address).toString();
}