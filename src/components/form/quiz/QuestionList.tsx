import QuestionMenu from "@/components/elements/content/question/QuestionMenu";
import QuestionForm from "@/components/form/quiz/QuestionForm";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { QuestionDto } from "@/types/dto/QuestionDto";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
type Props = {
    defaultQuestion: QuestionDto
};
const QuestionList = ({ defaultQuestion }: Props) => {
    const { control, formState } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name: "questions" });
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(1);
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
    const handleAdd = () => {
        append(defaultQuestion);
        setTimeout(() => {
            // chuyển đến câu hỏi mới được thêm
            api?.scrollTo(fields.length); // vì fields.length là index tiếp theo
        }, 0); // Delay nhỏ để đảm bảo React cập nhật DOM xong

    }
    const handleRemove = (index: number) => {
        remove(index);
        setTimeout(() => {
            // Nếu đang ở câu hỏi đầu tiên, giữ nguyên ở index 0
            const newIndex = Math.max(current - 2, 0);
            api?.scrollTo(newIndex);
        }, 0);
    }
    const handleIndexClick = (index: number) => {
        api?.scrollTo(index);
    }
    // const questionErrors = useMemo(() => {
    //     return formState.errors?.questions ?? [];
    // }, [formState.errors?.questions]);
    // const slideState = useMemo(() => {
    //     return fields.map((item, index) => {
    //         if (index === current && ) return "warning";
    //         if (index === current) return "selected";
    //         if (questionErrors[index]) return "error";
    //         return "unselected";
    //     })
    // }, [questionErrors, current, fields]);
    return (
        <div>
            <Button
                type="button"
                onClick={handleAdd}>Add</Button>
            <Carousel setApi={setApi}>
                <CarouselContent>
                    {fields.map((field, index) => (
                        <CarouselItem key={field.id ?? index}>
                            <div className="p-4 border rounded-lg shadow space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-semibold">Question {index + 1}</span>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
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
            {/* <QuestionMenu onIndexClick={handleIndexClick} states={slideState} /> */}
        </div>
    );
}
export default QuestionList; 