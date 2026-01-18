</div>
</div>

<!-- MODAL OVERLAY -->
<div id="modal-overlay"
    class="fixed inset-0 bg-black/60 hidden z-50">
</div>

<!-- MODAL BASE -->
<div id="modal-base" class="fixed inset-0 bg-black/40 hidden items-center justify-center z-50">
  <div class="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">

    <div class="flex justify-between items-center mb-4">
      <h3 id="modal-title" class="text-lg font-semibold"></h3>
      <button id="modal-close" class="text-gray-400 hover:text-gray-600">✕</button>
    </div>

    <div id="modal-content"></div>

  </div>
</div>


<script src="assets/js/logout.js"></script>
<script src="assets/js/ultil.js"></script>

<!-- JS DO MENU MOBILE -->
<script>
document.getElementById("btnMenu").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("-translate-x-full");
});
</script>

</body>
</html>