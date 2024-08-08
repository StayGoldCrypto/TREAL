#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{
    decl_module, decl_storage, decl_event, decl_error, ensure, dispatch::DispatchResult,
};
use frame_system::ensure_signed;
use sp_std::vec::Vec;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Default)]
pub struct Loan {
    applicant: Vec<u8>,
    amount: u128,
    property: Vec<u8>,
    status: LoanStatus,
}

#[derive(Serialize, Deserialize, PartialEq)]
pub enum LoanStatus {
    Pending,
    Approved,
    Rejected,
    Disbursed,
}

impl Default for LoanStatus {
    fn default() -> Self {
        LoanStatus::Pending
    }
}

pub trait Config: frame_system::Config {
    type Event: From<Event<Self>> + Into<<Self as frame_system::Config>::Event>;
}

decl_storage! {
    trait Store for Module<T: Config> as LoanModule {
        Loans get(fn loans): map hasher(blake2_128_concat) u32 => Option<Loan>;
        LoanCount get(fn loan_count): u32;
    }
}

decl_event!(
    pub enum Event<T> where AccountId = <T as frame_system::Config>::AccountId {
        LoanApplied(AccountId, u32),
        LoanApproved(u32),
        LoanRejected(u32),
        LoanDisbursed(u32, u128),
    }
);

decl_error! {
    pub enum Error for Module<T: Config> {
        LoanAlreadyExists,
        LoanNotFound,
        NotAuthorized,
        LoanAlreadyDisbursed,
    }
}

decl_module! {
    pub struct Module<T: Config> for enum Call where origin: T::Origin {
        fn deposit_event() = default;

        #[weight = 10_000]
        fn apply_loan(origin, amount: u128, property: Vec<u8>) -> DispatchResult {
            let applicant = ensure_signed(origin)?;

            let loan = Loan {
                applicant: applicant.clone().into(),
                amount,
                property: property.clone(),
                status: LoanStatus::Pending,
            };

            let loan_id = Self::loan_count();
            Loans::<T>::insert(loan_id, loan);
            LoanCount::put(loan_id + 1);

            Self::deposit_event(RawEvent::LoanApplied(applicant, loan_id));
            Ok(())
        }

        #[weight = 10_000]
        fn approve_loan(origin, loan_id: u32) -> DispatchResult {
            let approver = ensure_signed(origin)?;

            Loans::<T>::mutate(loan_id, |loan| {
                if let Some(l) = loan {
                    ensure!(l.status == LoanStatus::Pending, Error::<T>::LoanNotFound);
                    l.status = LoanStatus::Approved;
                }
            });

            Self::deposit_event(RawEvent::LoanApproved(loan_id));
            Ok(())
        }

        #[weight = 10_000]
        fn reject_loan(origin, loan_id: u32) -> DispatchResult {
            let approver = ensure_signed(origin)?;

            Loans::<T>::mutate(loan_id, |loan| {
                if let Some(l) = loan {
                    ensure!(l.status == LoanStatus::Pending, Error::<T>::LoanNotFound);
                    l.status = LoanStatus::Rejected;
                }
            });

            Self::deposit_event(RawEvent::LoanRejected(loan_id));
            Ok(())
        }

        #[weight = 10_000]
        fn disburse_loan(origin, loan_id: u32) -> DispatchResult {
            let disburser = ensure_signed(origin)?;

            Loans::<T>::mutate(loan_id, |loan| {
                if let Some(l) = loan {
                    ensure!(l.status == LoanStatus::Approved, Error::<T>::LoanNotFound);
                    ensure!(l.status != LoanStatus::Disbursed, Error::<T>::LoanAlreadyDisbursed);

                    // Here you would typically transfer the loan amount to the applicant
                    // For this MVP, we will just change the status
                    l.status = LoanStatus::Disbursed;

                    // Emit event for loan disbursement
                    Self::deposit_event(RawEvent::LoanDisbursed(loan_id, l.amount));
                }
            });

            Ok(())
        }
    }
}
