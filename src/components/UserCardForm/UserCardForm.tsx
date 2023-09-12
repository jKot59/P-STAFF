import useCreditCardFormLogic from "./useCreditCardFormLogic";

function UserCardForm() {
  const {
    onSubmit,
    cardType,
    register,
    handleCardNumberChange,
    handleCardNumberBlur,
    cardNumberRef,
    errors,
    expiredDateRef,
    handleExpiredDateBlur,
    clearErrors,
    cvvRef,
    handleCVVBlur,
    cardHolderRef,
    handleCardHolderBlur,
  } = useCreditCardFormLogic();

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 border border-indigo-600 p-5 rounded w-96"
    >
      <label htmlFor="cardNumber" className="flex flex-col">
        Card number {cardType}
        <input
          autoFocus
          maxLength={19}
          id="cardNumber"
          {...register("cardNumber")}
          onChange={handleCardNumberChange}
          onBlur={handleCardNumberBlur}
          ref={cardNumberRef}
        />
        {errors.cardNumber && (
          <span>{errors.cardNumber.message?.toString()}</span>
        )}
      </label>

      <label htmlFor="expiredDate" className="flex flex-col">
        MM/YY
        <input
          id="expiredDate"
          {...register("expiredDate")}
          ref={expiredDateRef}
          onBlur={handleExpiredDateBlur}
          onFocus={() => clearErrors("cardNumber")}
        />
        {errors.expiredDate && (
          <span>{errors.expiredDate.message?.toString()}</span>
        )}
      </label>

      <label htmlFor="cvv" className="flex flex-col">
        CVV
        <input
          maxLength={3}
          id="cvv"
          {...register("cvv")}
          ref={cvvRef}
          onBlur={handleCVVBlur}
          onFocus={() => clearErrors("expiredDate")}
        />
        {errors.cvv && <span>{errors.cvv.message?.toString()}</span>}
      </label>
      <label htmlFor="cardHolder" className="flex flex-col">
        Holder name
        <input
          maxLength={25}
          id="cardHolder"
          {...register("cardHolder")}
          ref={cardHolderRef}
          onBlur={handleCardHolderBlur}
          onFocus={() => clearErrors("cvv")}
        />
        {errors.cardHolder && (
          <span>{errors.cardHolder.message?.toString()}</span>
        )}
      </label>

      <input
        type="submit"
        value={"Pay"}
        className="w-min mx-auto p-1 bg-cyan-400 rounded pl-5 pr-5"
        disabled={Object.values(errors).length > 0}
      />
    </form>
  );
}

export default UserCardForm;
