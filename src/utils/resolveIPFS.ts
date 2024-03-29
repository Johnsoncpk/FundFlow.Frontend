export const resolveIPFS = (url: string): string => {
  if (!url || !url.includes('ipfs://')) {
    return url;
  }
  return `${url.replace('ipfs://', 'https://lavender-many-giraffe-83.mypinata.cloud/ipfs/')}?pinataGatewayToken=AvICqVkS-J59u2ajwmimFR5228eX4aoP-_Hd_NKzc7xnHY_FEv23ysBn2lX0yqIX`;
};
