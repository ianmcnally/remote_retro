defmodule RemoteRetro.ChannelCase do
  @moduledoc """
  This module defines the test case to be used by
  channel tests.

  Such tests rely on `Phoenix.ChannelTest` and also
  import other functionality to make it easier
  to build and query models.

  Finally, if the test case interacts with the database,
  it cannot be async. For this reason, every test runs
  inside a transaction which is reset at the beginning
  of the test unless the test case is marked as async.
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      # Import conveniences for testing with channels
      use Phoenix.ChannelTest

      alias RemoteRetro.Repo
      import Ecto
      import Ecto.Changeset
      import Ecto.Query
      import RemoteRetro.TestHelpers

      # The default endpoint for testing
      @endpoint RemoteRetro.Endpoint
    end
  end

  setup _tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(RemoteRetro.Repo)

    Ecto.Adapters.SQL.Sandbox.mode(RemoteRetro.Repo, {:shared, self()})

    retro = RemoteRetro.Repo.insert!(%RemoteRetro.Retro{})
    { :ok, retro: retro }
  end
end
