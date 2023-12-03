use anchor_lang::prelude::*;
use mpl_bubblegum::types::{Collection, Creator, TokenProgramVersion, TokenStandard, Uses};

#[account]
pub struct CnftMetadata {
    pub name: String,
    pub symbol: String,
    pub uri: String,
    pub seller_fee_basis_points: u16,
    pub primary_sale_happened: bool,
    pub is_mutable: bool,
    pub edition_nonce: Option<u8>,
    pub token_standard: Option<TokenStandard>,
    pub collection: Option<Collection>,
    pub uses: Option<Uses>,
    pub token_program_version: TokenProgramVersion,
    pub creators: Vec<Creator>,
    pub cnft_metadata_account_creator: Pubkey,
}
