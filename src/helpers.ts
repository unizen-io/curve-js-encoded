import { createPublicClient, http, PublicClient } from "viem";
import { arbitrum, avalanche, base, bsc, fantom, mainnet, optimism, polygon } from "viem/chains";

export enum CHAINS {
    Mainnet = 1,
    Polygon = 137,
    Bsc = 56,
    Avax = 43114,
    Ftm = 250,
    Op = 10,
    Arbi = 42161,
    Base = 8453,
}

const viemChainTranslation = (chainId: CHAINS) => {
    switch (chainId) {
        case CHAINS.Mainnet:
            return mainnet;
        case CHAINS.Polygon:
            return polygon;
        case CHAINS.Bsc:
            return bsc;
        case CHAINS.Avax:
            return avalanche;
        case CHAINS.Ftm:
            return fantom;
        case CHAINS.Arbi:
            return arbitrum;
        case CHAINS.Op:
            return optimism;
        case CHAINS.Base:
            return base;
    }
};

export const getPublicClient = (chainId: CHAINS, urlRpc: string): PublicClient => {
    const publicClient = createPublicClient({
        chain: viemChainTranslation(chainId),
        transport: http(urlRpc),
    });
    return publicClient as PublicClient;
};
