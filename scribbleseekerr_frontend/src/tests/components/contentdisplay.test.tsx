import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContentDisplay from "@/components/ContentDisplay";

describe("ContentDisplay", () => {
  test("renders content correctly", () => {
    const content = "This is a test content.";
    render(<ContentDisplay content={content} />);
    const contentElement = screen.getByText(content);
    expect(contentElement).toBeInTheDocument();
  });

  test("renders content with custom class", () => {
    const content = "This is a test content.";
    const className = "custom-class";
    render(<ContentDisplay content={content} className={className} />);
    const contentElement = screen.getByText(content);
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveClass(className);
  });

  test("renders multiline content correctly", () => {
    const content = "Line 1\nLine 2\nLine 3";
    render(<ContentDisplay content={content} />);

    const contentLines = content.split("\n");

    contentLines.forEach((line) => {
      const lineElements = screen.getAllByText((content, element) => {
        return element!.textContent!.includes(line);
      });

      expect(lineElements.length).toBeGreaterThan(0);
    });
  });
});
