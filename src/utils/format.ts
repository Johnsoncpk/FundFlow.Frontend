import { utils } from 'ethers';

export const getEllipsisTxt = (str?: string, n = 6) => {
  if (str) {
    return (
      n*2+3 >= str.length
        ? str
        : `${str.slice(0, n)}...${str.slice(str.length - n)}`
    );
  }
  return '';
};

export function normalizeContractObject<Type>(arg: Type): Type {
  return JSON.parse(JSON.stringify(
    arg,
    (_, value) => {
      return typeof value === 'bigint'
        ? value.toString()
        : value
    }));
}

export const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

export function formatEtherToNumber(value: bigint): number {
  return Number(utils.formatEther(value))
}

export function formatDateToString(value: bigint): string {
  return new Date(Number(value) * 1000).toLocaleString()
}

export function getTotalCollectedFund(rounds: readonly {
  id: bigint;
  amountSentToCreator: bigint;
  collectedFund: bigint;
  fundingGoal: bigint;
  endAt: bigint;
}[]) {
  return rounds.reduce<number>((n, { collectedFund }) => n + formatEtherToNumber(collectedFund), 0);
}