import Confirm from "@/components/common/Confirm";
import SheetElement from "@/components/common/SheetElement";
import TitleContent from "@/components/common/TitleContent";
import QuestionMenu from "@/components/elements/content/question/QuestionMenu";
import QuestionForm from "@/components/form/quiz/QuestionForm";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuizRequest } from "@/types/request/QuizRequest";
import { QuizResponse } from "@/types/response/QuizResponse";
import { Menu } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
type Props = {
    defaultQuiz: QuizRequest;
    quiz?: QuizResponse;
};
const QuestionList = ({ defaultQuiz, quiz }: Props) => {
    const defaultQuestion = defaultQuiz.questions[0]
    const [open, setOpen] = useState(false);
    const [openConfirmType, setOpenConfirmType] = useState<"reset" | "remove" | "reset all" | null>(null)
    const { control, formState, setValue } = useFormContext<QuizRequest>();
    const { fields, replace, append, remove } = useFieldArray({ control, name: "questions" });
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(1);
    const isMobile = useIsMobile()
    useEffect(() => {
        if (!api) return;
        const onSelect = () => {
            setCurrent(api.selectedScrollSnap() + 1);
        };
        api.on("select", onSelect);
        onSelect(); // Gọi lần đầu để khởi tạo đúng vị trí
        return () => {
            api.off("select", onSelect);
        };
    }, [api]);
    const onResetAll = () => {
        if (quiz) {
            setValue("questions", quiz.questions)
        } else {
            setValue("questions", defaultQuiz.questions)
        }
    }
    const onReset = () => {
        const index = current - 1;
        if (index < 0) return;

        const updatedQuestions = [...fields];

        const resetQuestion = quiz?.questions?.[index]
            ? { ...quiz.questions[index] }
            : {
                ...defaultQuestion,
                answers: defaultQuestion.answers.map(a => ({ ...a })),
            };

        // Preserve the `id` field from the existing field
        updatedQuestions[index] = {
            ...resetQuestion,
            id: fields[index].id, // VERY IMPORTANT for useFieldArray
        };

        replace(updatedQuestions);
    }
    const onConfirm = () => {
        console.log(openConfirmType);
        switch (openConfirmType) {
            case "reset all":
                onResetAll();
                break;
            case "reset":
                onReset();
                break;
            case "remove":
                handleRemove()
                break
            default:
                setOpenConfirmType(null)
                break
        }
    }
    const handleRemove = useCallback(() => {
        const indexToRemove = current - 1;

        // Đảm bảo index hợp lệ
        if (indexToRemove < 0 || indexToRemove >= fields.length) return;

        remove(indexToRemove);

        // Tính toán index mới
        const newIndex = Math.max(indexToRemove - 1, 0);

        setCurrent(newIndex + 1);
        setTimeout(() => {
            api?.scrollTo(newIndex);
        }, 0)
    }, [api, current, remove, fields.length])
    // }, [current, handleRemove, onReset, openConfirmType])
    const handleAdd = useCallback(() => {
        append(defaultQuestion);
        setTimeout(() => {
            // chuyển đến câu hỏi mới được thêm
            api?.scrollTo(fields.length); // vì fields.length là index tiếp theo
        }, 0); // Delay nhỏ để đảm bảo React cập nhật DOM xong
    }, [api, append, fields.length, defaultQuestion])
    const handleIndexClick = useCallback((index: number) => {
        api?.scrollTo(index);
    }, [api])
    const questionErrors = useMemo(() => {
        const errors = formState.errors?.questions;
        return Array.isArray(errors) ? errors : [];
    }, [formState.errors?.questions]);

    const errorCount = questionErrors.filter(Boolean).length;
    const safeCurrent = Math.min(current, fields.length || 1);
    const slideState = useMemo(() => {
        return fields.map((_, index) => {
            const isCurrent = index === safeCurrent - 1;
            const hasError = !!questionErrors[index];
            if (isCurrent && hasError) return "warning";
            if (isCurrent) return "selected";
            if (hasError) return "error";
            return "unselected";
        })
    }, [fields, safeCurrent, errorCount]);
    const renderMenu = () => {
        return isMobile
            ? <SheetElement title="Question menu" open={open} setOpen={setOpen} >{
                <QuestionMenu
                    onIndexClick={handleIndexClick}
                    states={slideState}
                />
            }</SheetElement>
            : (
                <div className="w-64 shrink-0">
                    <TitleContent className="mb-4">Question menu</TitleContent>
                    <QuestionMenu
                        onIndexClick={handleIndexClick}
                        states={slideState}
                    />
                </div>
            );
    }

    return (
        <div className="space-y-4">
            {/* Add Button */}
            <div className="flex justify-between">
                <Button type="button" variant={"success"} onClick={handleAdd}>
                    Add
                </Button>
                <Button type="button" variant={"warning"} onClick={() => setOpenConfirmType("reset all")}>
                    Reset all questions
                </Button>
                {isMobile &&
                    < Button type="button" onClick={() => setOpen(true)}>
                        <Menu />
                    </Button>

                }
            </div>

            {/* Carousel + QuestionMenu */}
            <div className="flex gap-4 gap-x-6">
                {/* Carousel Section */}
                <div className="flex-1 min-w-0">
                    <Carousel setApi={setApi}>
                        <CarouselContent>
                            {fields.map((field, index) => (
                                <CarouselItem key={field.id ?? index}>
                                    <div className="p-4 border rounded-lg shadow space-y-4 bg-white">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-semibold">
                                                Question {index + 1}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setOpenConfirmType("reset")}
                                            >
                                                Rest
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="error"
                                                onClick={() => setOpenConfirmType("remove")}
                                                disabled={fields.length <= 1}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                        <QuestionForm name={`questions.${index}`} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                {renderMenu()}
            </div>
            <Confirm open={openConfirmType !== null} onContinue={() => onConfirm()} onCancel={() => setOpenConfirmType(null)} title={`Are you want ${openConfirmType} ?`} />
        </div >

    );
}
export default QuestionList; 