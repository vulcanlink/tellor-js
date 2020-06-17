export interface TellorInfo {
    stakerCount: string;
    difficulty: string;
    currentRequestId: string;
    disputeCount: string;
    totalSupply: string;
    timeOfLastValue: string;
    requestCount: string;
}

export interface RequestInfo {
    apiString: string;
    dataSymbol: string;
    queryHash: string;
    granularity: string;
    requestQPosition: string;
    totalTip: string;
}

export interface RequestValue {
    didGet: boolean;
    value: string;
    timestampRetrieved: string;
}

export interface Dispute {
    hash: string;
    executed: string;
    disputeVotePassed: string;
    isPropFork: boolean;
    reportedMiner: string;
    reportingParty: string;
    proposedForkAddress: string;
    requestId: string;
    timestamp: string;
    value: string;
    minExecutionDate: string;
    stringOfVotes: string;
    blockNumber: string;
    minerSlot: string;
    quorum: string;
    fee: string;
}

export type RequestQueue = any;
