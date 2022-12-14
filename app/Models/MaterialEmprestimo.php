<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialEmprestimo extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'materiais_emprestimos';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        
    ];

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['subunidade', 'material', 'usuario'];


     public function subunidade()
    {
        return $this->belongsTo(Subunidade::class);
    }

    public function material()
    {
        return $this->belongsTo(Material::class);
    }

     public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id')->without(['perfil', 'setor', 'subunidade']);
    }
}
