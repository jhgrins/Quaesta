import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import casual from "casual";
import sinon from "sinon";

import Buttons from "../../../../frontend/components/UI/Buttons";

describe("components/UI/Buttons", () => {
    describe("Buttons", () => {
        it("should be a function", () => {
            Buttons.should.be.a("function");
        });

        it("should have an image with a certain height", () => {
            render(<Buttons height={200} />);
            screen.getByAltText("Quaesta Buttons").should.have.height(200);
        });
    });
});
