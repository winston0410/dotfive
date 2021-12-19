<script lang="ts" context="module">
	import { UnorderedList, ListItem, Button, Modal, Form, TextInput } from 'carbon-components-svelte';
	import items from '../store/items';
    import channel from '../channel'
    import { IDataType, IMutation } from '../types'
</script>

<script lang="ts">
    let open = false;
    let editOpen = false;
    
    let editItem = null;

	const handleRemove = (id: number) => () => {
		const removed = $items.filter((item) => item.id !== id);
		items.set(removed);
        channel.dispatch({
            type: IDataType.Label,
            mutation: IMutation.Remove,
            payload: {
                id
            }
        })
	};

	const popEditModal = (id: number) => () => {
        const item = $items.find((item) => item.id === id) 
        editOpen = true;
        editItem = {...item}
    };

    const handleEdit = (e: SubmitEvent) => {
        // TODO Validation
        const data = new FormData((e.target as HTMLFormElement))
        const label = data.get("label")

        editItem.label = label

        const index = $items.findIndex(item => item.id === editItem.id)
        
        const updated = [...$items]
        updated[index] = editItem

        items.set(updated)

        channel.dispatch({
            type: IDataType.Label,
            mutation: IMutation.Update,
            payload: editItem
        })

        editOpen = false
    }

	const handleCreate = (e: SubmitEvent) => {
        // TODO Validation
        const data = new FormData((e.target as HTMLFormElement))
        const label = data.get("label")
        
		const index = $items[$items.length - 1].id;


		const newItem = {
				id: index + 1,
				label: (label as string)
			}
        
		items.set([
			...$items,
            newItem
		]);

        open = false;

        channel.dispatch({
            type: IDataType.Label,
            mutation: IMutation.Create,
            payload: newItem
        })
	};

    const popModal = () => {
        open = true;
    }
</script>

<div>
    <div class="page-header">
        <h1>My data</h1>
        <Button on:click={popModal}>Create</Button>
    </div>
	<UnorderedList expressive>
		{#each $items as item (item.id)}
			<ListItem class="list-item">
				<div class="item-container">
					<span class="item-label">{item.label}</span>
					<div class="button-container">
						<Button class="item-button" type="button" on:click={popEditModal(item.id)}>Edit</Button>
						<Button class="item-button" type="button" on:click={handleRemove(item.id)}
							>Remove</Button
						>
					</div>
				</div>
			</ListItem>
		{/each}
	</UnorderedList>
</div>
<Modal passiveModal modalHeading={"Create new item"} bind:open on:open on:close>
    <Form on:submit={handleCreate}>
      <TextInput name="label" labelText="Enter item label" placeholder="Enter item label" />
      <Button type="submit">Create</Button>       
    </Form>
</Modal>

<Modal passiveModal modalHeading={"Edit item"} bind:open={editOpen} on:open on:close>
    <Form on:submit={handleEdit}>
      <TextInput name="label" value={editItem?.label} labelText="Enter item label" placeholder="Enter item label" />
      <Button type="submit">Edit</Button>
    </Form>
</Modal>

<style>
    .page-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }
    
	.item-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.button-container {
		display: flex;
	}

	:global(.item-button) {
		width: fit-content;
	}

	:global(.item-button:not(:last-of-type)) {
		margin-right: 0.5rem;
	}

    :global(.list-item:not(:last-of-type)){
        margin-bottom: 0.5rem;
    }
        
    :global(.bx--list--unordered>.list-item::before){
        content: none;
    }
</style>
