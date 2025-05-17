import SheetElement from "@/components/common/SheetElement";
import TitleContent from "@/components/common/TitleContent";
import QuestionMenu from "@/components/elements/content/question/QuestionMenu";
import QuestionForm from "@/components/form/quiz/QuestionForm";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuestionDto } from "@/types/dto/QuestionDto";
import { QuizRequest } from "@/types/request/QuizRequest";
import { Menu } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
type Props = {
    defaultQuestion: QuestionDto
};
const QuestionList = ({ defaultQuestion }: Props) => {
    const [open, setOpen] = useState(false);
    const { control, formState } = useFormContext<QuizRequest>();
    const { fields, append, remove } = useFieldArray({ control, name: "questions" });
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
    const handleAdd = useCallback(() => {
        append(defaultQuestion);
        setTimeout(() => {
            // chuyển đến câu hỏi mới được thêm
            api?.scrollTo(fields.length); // vì fields.length là index tiếp theo
        }, 0); // Delay nhỏ để đảm bảo React cập nhật DOM xong
    }, [api, append, fields.length, defaultQuestion])
    const handleRemove = useCallback((index: number) => {
        remove(index);
        setTimeout(() => {
            // Nếu đang ở câu hỏi đầu tiên, giữ nguyên ở index 0
            const newIndex = Math.max(current - 2, 0);
            api?.scrollTo(newIndex);
        }, 0)
    }, [api, current, remove])
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
                <Button type="button" onClick={handleAdd}>
                    Add
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
                                                variant="destructive"
                                                onClick={() => handleRemove(index)}
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
        </div >

    );
}
export default QuestionList; 