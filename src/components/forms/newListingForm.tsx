"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import jsonData from "@/data/componentsData.json";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
export function NewListingForm() {
  const { newListings } = jsonData;
  const addInput = () => {
    const inputCont = document.getElementById("input-cont");
    const input = document.createElement("input");
    input.type = "text";
    input.className =
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
    input.placeholder = "New Variant";
    inputCont?.appendChild(input);
  };
  return (
    <Card>
      <CardContent className="p-8">
        {newListings.map((item) => (
          <div className="flex flex-col gap-2 ">
            <Label className="font-bold pt-8 text-lg">{item.label}</Label>
            {item.fields.map((field) => (
              <div>
                <Label>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea />
                ) : field.type == "button" ? (
                  <div id="input-cont" className="space-y-2"></div>
                ) : field.type == "file" ? (
                  <div className="grid w-full w-full items-center gap-1.5">
                    <Input id="picture" type="file" multiple />
                  </div>
                ) : (
                  <Input type={field.type} />
                )}
              </div>
            ))}
          </div>
        ))}
        <div className="mt-2 space-y-2">
          <Button onClick={() => addInput()}>+ Add variants</Button>
        </div>
      </CardContent>
    </Card>
  );
}
