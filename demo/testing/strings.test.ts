// jest
import { error } from "console";
import { concat, div, failedString, slowString} from "./strings"


 it('should say "Hello, world!"', () => {
    expect(concat("Hello,", " world!")).toEqual("Hello, world!");
  });

it('should divide', () =>{
    expect(div(10,2)).toEqual(5)
})

test("slow string fetches sample test", async() =>{
    slowString().then((data) =>{
        expect(data).toEqual("sample")

    })
    .catch((error) => expect(error).toBeUndefined())
})