<template>
    <div class="auth-layout">
        <div class="auth-layout__form-container">
            <div class="auth-layout__form">
                <h1 class="auth-layout__form-title">Login</h1>
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.auth-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .auth-layout__form-container {
        width: 30rem;
        max-width: 95%;
        padding: 1.6rem 1.8rem;
        border-radius: 0.7rem;
        box-shadow: 0 0 6px rgb(225, 225, 225);

        .auth-layout__form {
            width: 100%;

            .auth-layout__form-title {
                text-align: center;
                margin-bottom: 1rem;
            }
        }
    }
}
</style>
