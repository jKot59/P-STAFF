import getCardType from "@/utilities/getCardType";
import luhnCheck from "@/utilities/luhnCheck";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function useCreditCardFormLogic() {
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const expiredDateRef = useRef<HTMLInputElement | null>(null);
  const cvvRef = useRef<HTMLInputElement | null>(null);
  const cardHolderRef = useRef<HTMLInputElement | null>(null);
  const [cardType, setCardType] = useState("");

  const schemaCardNumber = z
    .string()
    .refine((value) => /^[0-9]{16,19}$/.test(value), {
      message: "Номер карты должен содержать от 16 до 19 цифр",
    })
    .refine((value) => luhnCheck(value), {
      message: "Неправильный номер карты",
    });
  const schemaExpiredDate = z
    .string()
    .refine((value) => {
      // Проверка формата MM/YY
      const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      return dateRegex.test(value);
    }, "Invalid date format")
    .refine((value) => {
      // Проверка на неистекшую дату
      const [month, year] = value.split("/");
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (parseInt(year, 10) < currentYear) {
        return false;
      } else if (
        parseInt(year, 10) === currentYear &&
        parseInt(month, 10) < currentMonth
      ) {
        return false;
      }

      return true;
    }, "Expired date");
  const schemaCVV = z
    .string()
    .min(3, "CVV must be 3 digits")
    .refine((value) => /^[0-9]*$/.test(value), {
      message: "Номер карты должен содержать от 16 до 19 цифр",
    });
  const schemaCardHolder = z.string().min(1, "Holder name is required");

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(cardNumberRef?.current?.value);
    expiredDateRef;
    cvvRef;
    cardHolderRef;
  };

  const handleCardNumberBlur = (data: any) => {
    try {
      schemaCardNumber.parse(data.target.value);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      setError("cardNumber", {
        type: "manual",
        message: "Пожалуйста, исправьте ошибку в номере карты",
      });
      // Если ошибок нет, переведите фокус на следующее поле
      //@ts-ignore
      cardNumberRef?.current?.focus();
    }
  };

  const handleCardNumberChange = (data: any) => {
    const cardType = getCardType(data.target.value);
    setCardType(cardType);
  };

  const handleExpiredDateBlur = (data: any) => {
    try {
      schemaExpiredDate.parse(data.target.value);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      setError("expiredDate", {
        type: "manual",
        message: "Пожалуйста, исправьте ошибку в дате",
      });
      // Если ошибок нет, переведите фокус на следующее поле
      //@ts-ignore
      expiredDateRef?.current?.focus();
    }
  };

  const handleCVVBlur = (data: any) => {
    try {
      schemaCVV.parse(data.target.value);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      setError("cvv", {
        type: "manual",
        message: "Пожалуйста, исправьте ошибку в CVV",
      });
      // Если ошибок нет, переведите фокус на следующее поле
      //@ts-ignore
      cvvRef?.current?.focus();
    }
  };
  const handleCardHolderBlur = (data: any) => {
    try {
      let cardHolder = schemaCardHolder.parse(data.target.value);
      clearErrors("cardHolder");
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      setError("cardHolder", {
        type: "manual",
        message: "Пожалуйста, исправьте ошибку в имени",
      });
      cardHolderRef?.current?.focus();
    }
  };
  // console.log(watch("cardNumber")); // watch input value by passing the name of it
  console.log(errors);

  return {
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
  };
}

export default useCreditCardFormLogic;
