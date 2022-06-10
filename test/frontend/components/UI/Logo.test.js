import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);

import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import casual from "casual";
import sinon from "sinon";

// import Logo from "../../../../frontend/components/UI/Logo";

describe("frontend/components/UI/Logo", () => {
    describe("Logo", () => {
        it("should be a function", () => {
            // Logo.should.be.a("function");
        });

        it("should have an image with a certain height", () => {
            // render(<Logo height={200} />);
            // screen.getByAltText("Quaesta Logo").should.have.height(200);
        });
    });
});
