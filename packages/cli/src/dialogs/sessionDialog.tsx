import { useCallback, useEffect, useState } from "react";
import { TextAttributes } from "@opentui/core";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { useDialog, useToast } from "../hooks";
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

  return (
    <SearchList
      items={sessons}
      onSelect={handleSelect}
      filterFn={(s, q) => s.title.toLowerCase().includes(q.toLowerCase())}
      renderItem={(session, isSelected) => (
        <>
          <text selectable={false} fg={isSelected ? "black" : "white"}></text>
          <box flexGrow={1} />
          <text
            selectable={false}
            fg={isSelected ? "black" : undefined}
            attributes={TextAttributes.DIM}
          >
            {format(new Date(session.createdAt), "hh:mm a")}
          </text>
        </>
      )}
      getKey={(s) => s.id}
      placeholder="Search session"
      emptyText="No matching session"
    />
  );
};
