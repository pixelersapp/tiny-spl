use anchor_lang::prelude::*;

#[account]
pub struct Metadata {
    pub authority: Pubkey,
    // actual json buffer is hidden to avoid deserialization
}
