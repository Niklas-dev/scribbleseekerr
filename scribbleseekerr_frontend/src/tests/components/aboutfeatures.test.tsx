import AboutFeatures from "@/components/AboutFeatures";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("AboutFeatures", () => {
  test("renders the component", () => {
    render(<AboutFeatures />);

    // Check if the main heading is rendered
    const mainHeading = screen.getByText(
      "Next stop? Your creativity and imagination!"
    );
    expect(mainHeading).toBeInTheDocument();

    // Check if all feature cards are rendered
    const featureTexts = [
      "Different Texts!",
      "GPT Allowed!",
      "On Page Editor!",
      "Earn Reputation!",
    ];
    featureTexts.forEach((text) => {
      const featureCard = screen.getByText(text);
      expect(featureCard).toBeInTheDocument();
    });
  });
});
