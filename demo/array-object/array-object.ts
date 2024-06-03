/* eslint-disable */
import { strict as assert } from "assert";
import { title } from "process";

type Link = {
    title: string;
    url: string;
};

const Microsoft = {
    title: "microsoft",
    url: "microsoft.com"
}

const typescript = {
    title: "TypeScript",
    url: "typescript.com"

};

const links = [Microsoft, typescript];

// accessing the arrays
const tsurl = links[1].url;

links[0].title = "Microsoft"




