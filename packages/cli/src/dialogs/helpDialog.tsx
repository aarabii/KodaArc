import { useState } from "react";
import { TextAttributes } from "@opentui/core";
import { useTheme } from "../hooks";
import { SearchList } from "../components/common";
import { FAQ_ITEMS, type FaqItem } from "./faqData";

export function HelpDialogContent() {
  const { colors } = useTheme();
  const [activeFaq, setActiveFaq] = useState<FaqItem | null>(
    FAQ_ITEMS[0] || null,
  );

  return (
    <box flexDirection="column" gap={1}>
      <box height={7} flexShrink={0}>
        <SearchList
          items={FAQ_ITEMS}
          filterFn={(faq, q) =>
            faq.question.toLowerCase().includes(q.toLowerCase()) ||
            faq.answer.toLowerCase().includes(q.toLowerCase())
          }
          renderItem={(faq, isSelected) => (
            <text
              selectable={false}
              fg={isSelected ? colors.brand.primary : colors.text.primary}
            >
              {isSelected ? "› " : "  "}
              {faq.question}
            </text>
          )}
          onSelect={(faq) => setActiveFaq(faq)}
          onHighlight={(faq) => setActiveFaq(faq)}
          getKey={(faq) => faq.id}
          placeholder="Search questions (use ↑/↓ to navigate)..."
          emptyText="No matching questions found."
        />
      </box>

      {/* Divider line */}
      <box
        border={["top"]}
        borderColor={colors.border.dim}
        height={1}
        width="100%"
      />

      {/* Answer detail panel */}
      {activeFaq ? (
        <box flexDirection="column" gap={1}>
          <text attributes={TextAttributes.BOLD} fg={colors.brand.accent}>
            {activeFaq.question}
          </text>
          <text fg={colors.text.secondary}>{activeFaq.answer}</text>
        </box>
      ) : (
        <box height={2} justifyContent="center" alignItems="center">
          <text fg={colors.text.muted}>
            Select a question to view the answer.
          </text>
        </box>
      )}
    </box>
  );
}
