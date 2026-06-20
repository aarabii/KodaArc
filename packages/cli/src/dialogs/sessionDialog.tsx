import { useCallback, useEffect, useState } from "react";
import { TextAttributes } from "@opentui/core";
import { format, isToday, isYesterday, isThisWeek } from "date-fns";
import { useNavigate } from "react-router";
import { useDialog, useToast, useTheme } from "../hooks";
import { apiClient, getErrorMessage } from "../lib";
import { SearchList } from "../components";
import type { InferResponseType } from "hono/client";

type Session = InferResponseType<
  (typeof apiClient.sessions)["$get"],
  200
>[number];

export const SessionDialog = () => {
  const [sessons, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const { close } = useDialog();
  const { show } = useToast();
  const { colors } = useTheme();
  const nav = useNavigate();

  useEffect(() => {
    let ignore = false;

    const fetchSession = async () => {
      try {
        const res = await apiClient.sessions.$get();

        if (!res.ok) throw new Error(await getErrorMessage(res));

        const data = await res.json();

        if (!ignore) {
          setSessions(data);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          show({
            variant: "error",
            message:
              err instanceof Error ? err.message : "Failed to fetch session",
          });
          close();
        }
      }
    };

    fetchSession();

    return () => {
      ignore = true;
    };
  }, [close, show]);

  const handleSelect = useCallback(
    (session: Session) => {
      close();
      nav(`/sessions/${session.id}`);
    },
    [close, nav],
  );

  if (loading) {
    return (
      <box flexDirection="column">
        <text attributes={TextAttributes.DIM}>Loading session...</text>
      </box>
    );
  }

  function formatSessionDate(createdAt: string) {
    const date = new Date(createdAt);
    const time = format(date, "hh:mm a");

    if (isToday(date)) {
      return `Today ${time}`;
    }

    if (isYesterday(date)) {
      return `Yesterday ${time}`;
    }

    if (isThisWeek(date, { weekStartsOn: 1 })) {
      return `${format(date, "EEEE")} at ${time}`;
    }

    return format(date, "dd MMM yyyy 'at' hh:mm a");
  }

  return (
    <SearchList
      items={sessons}
      onSelect={handleSelect}
      filterFn={(s, q) => s.title.toLowerCase().includes(q.toLowerCase())}
      renderItem={(session, isSelected) => (
        <>
          <text selectable={false} fg={isSelected ? colors.selection.text : colors.text.primary}>
            {session.title}
          </text>
          <box flexGrow={1} />
          <text
            selectable={false}
            fg={isSelected ? colors.selection.text : colors.text.muted}
            attributes={TextAttributes.DIM}
          >
            {formatSessionDate(session.createdAt)}
          </text>
        </>
      )}
      getKey={(s) => s.id}
      placeholder="Search session"
      emptyText="No matching session"
    />
  );
};
