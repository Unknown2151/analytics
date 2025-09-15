<script lang="ts">
    export let data;
</script>

<main>
    <h1>Analytics Dashboard</h1>

    {#if data.stats.length > 0}
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Page</th>
                <th>Views</th>
            </tr>
            </thead>
            <tbody>
            <!-- Loop through each stat and create a table row -->
            {#each data.stats as stat}
                <tr>
                    <td>{new Date(stat.date).toLocaleDateString()}</td>
                    <td>{stat.eventName}</td>
                    <td>{stat.count}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    {:else}
        <p>No analytics data found. Send some events from the tracker!</p>
    {/if}
</main>

<style>
    main {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        max-width: 800px;
        margin: 2rem auto;
        padding: 1rem;
    }
    h1 {
        color: #333;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    th,
    td {
        border: 1px solid #dfe2e5;
        padding: 12px 15px;
        text-align: left;
    }
    th {
        background-color: #f6f8fa;
        font-weight: 600;
    }
    tbody tr:nth-child(even) {
        background-color: #f6f8fa;
    }
</style>