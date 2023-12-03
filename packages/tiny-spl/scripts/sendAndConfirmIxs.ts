import {
  Keypair,
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { CONNECTION } from "./constants";

export const sendAndConfirmIxs = async (
  ixs: TransactionInstruction[],
  payerKey: PublicKey,
  signers: Keypair[],
  skipPreflight = false
) => {
  const { blockhash, lastValidBlockHeight } =
    await CONNECTION.getLatestBlockhash();

  const messageV0 = new TransactionMessage({
    payerKey,
    recentBlockhash: blockhash,
    instructions: ixs,
  }).compileToV0Message();
  const transaction = new VersionedTransaction(messageV0);

  transaction.sign(signers);
  const txid = await CONNECTION.sendTransaction(transaction, {
    skipPreflight,
  });
  const result = await CONNECTION.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature: txid,
  });

  return result;
};
